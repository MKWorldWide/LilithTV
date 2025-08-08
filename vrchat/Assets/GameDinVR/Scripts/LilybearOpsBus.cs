using UnityEngine;
using System;

/// <summary>
/// Simple in-scene event bus for guardian cross-talk.
/// </summary>
public class LilybearOpsBus : MonoBehaviour
{
    public static LilybearOpsBus I;

    private void Awake()
    {
        I = this;
    }

    public delegate void Whisper(string from, string to, string message);
    public event Whisper OnWhisper;

    /// <summary>
    /// Broadcasts a message between guardians.
    /// </summary>
    public void Say(string from, string to, string message)
    {
        OnWhisper?.Invoke(from, to, message);
        Debug.Log($"[LilybearBus] {from} → {to}: {message}");
    }
}
