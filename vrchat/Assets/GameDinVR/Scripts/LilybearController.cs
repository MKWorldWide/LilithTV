using UnityEngine;

/// <summary>
/// Lilybear = voice & operations. Routes commands and logs them.
/// </summary>
public class LilybearController : GuardianBase
{
    [TextArea]
    public string LastMessage;

    private void Start()
    {
        GuardianName = "Lilybear";
        Role = "Voice & Operations";
    }

    public override void OnMessage(string from, string message)
    {
        LastMessage = $"{from}: {message}";
        // Simple routing example: echo to all guardians
        if (message.StartsWith("/route "))
        {
            var payload = message.Substring(7); // strip "/route "
            Whisper("*", payload); // broadcast to everyone
        }
    }

    /// <summary>
    /// Entry point called from external bridge when Discord message arrives.
    /// </summary>
    public void ReceiveDiscordMessage(string from, string content)
    {
        Whisper("*", $"{from} says {content}");
    }

    [ContextMenu("Test Whisper")]
    private void TestWhisper()
    {
        Whisper("*", "The council is assembled.");
    }
}
