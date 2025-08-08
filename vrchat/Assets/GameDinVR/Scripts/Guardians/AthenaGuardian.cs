using UnityEngine;

public class AthenaGuardian : GuardianBase
{
    private void Start()
    {
        GuardianName = "Athena";
        Role = "Strategy & Intelligence";
    }

    public override void OnMessage(string from, string message)
    {
        if (message.Contains("status"))
        {
            Whisper("Lilybear", "Athena: All systems nominal.");
        }
    }
}
