using UnityEngine;

/// <summary>
/// Placeholder for OSC hook (MCP → VRChat via external OSC app).
/// </summary>
public class OSCTextBridge : MonoBehaviour
{
    public TextMesh Target;

    public void SetText(string s)
    {
        if (Target != null)
        {
            Target.text = s;
        }
    }
}
