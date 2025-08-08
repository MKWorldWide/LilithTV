#if UDONSHARP
using UdonSharp;
using UnityEngine;

/// <summary>
/// Bridge script to route VRChat world events to the LilithTV overlay service.
/// Extend this behaviour with HTTP or WebSocket calls as needed.
/// </summary>
public class LilithTVBridge : UdonSharpBehaviour
{
    [Tooltip("Endpoint for LilithTV API service")]
    public string apiUrl = "http://localhost:3000/hook"; // TODO: externalize for production

    /// <summary>
    /// Example method invoked from Udon or Unity events to notify LilithTV.
    /// </summary>
    public void SendMessageToTV(string message)
    {
        // Placeholder: integrate UnityWebRequest or socket client here.
        Debug.Log($"[LilithTVBridge] Would send message to {apiUrl}: {message}");
    }
}
#endif
