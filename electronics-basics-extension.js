// TurboWarp / Scratch 3 extension: Basic Electronics Components
// Provides simple virtual components: Resistor, LED, Power Supply
// Author: ChatGPT (OpenAI o3) – May 2025
// Usage: Host this file (e.g., GitHub pages, local server) and paste its raw URL
// into TurboWarp ➜ Extensions ➜ "Custom Extension".

(function(Scratch) {
  "use strict";

  // Guard: ensure running in extension environment
  if (!Scratch.extensions) {
    throw new Error("Scratch extensions API not found – load in TurboWarp");
  }

  /**
   * Internal state for our virtual components
   */
  const state = {
    resistor: {
      ohms: 1000 // default 1 kΩ
    },
    power: {
      volts: 5 // default 5 V supply
    },
    led: {
      on: false
    }
  };

  /** Helper: clamp number to reasonable range */
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  class ElectronicsBasics {
    getInfo() {
      return {
        id: "electronicsBasics",
        name: "Electronics Basics",
        color1: "#4B8DF8",
        color2: "#2D6AE3",
        blocks: [
          {
            opcode: "setResistor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set resistor to [OHMS] Ω",
            arguments: {
              OHMS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1000
              }
            }
          },
          {
            opcode: "getResistor",
            blockType: Scratch.BlockType.REPORTER,
            text: "resistor (Ω)"
          },
          "---",
          {
            opcode: "setVoltage",
            blockType: Scratch.BlockType.COMMAND,
            text: "set supply to [VOLTS] V",
            arguments: {
              VOLTS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              }
            }
          },
          {
            opcode: "getVoltage",
            blockType: Scratch.BlockType.REPORTER,
            text: "supply voltage (V)"
          },
          "---",
          {
            opcode: "toggleLED",
            blockType: Scratch.BlockType.COMMAND,
            text: "turn LED [STATE]",
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "ledStateMenu",
                defaultValue: "on"
              }
            }
          },
          {
            opcode: "ledIsOn",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "LED on?"
          },
          "---",
          {
            opcode: "calcCurrent",
            blockType: Scratch.BlockType.REPORTER,
            text: "current (A)",
            disableMonitor: false
          }
        ],
        menus: {
          ledStateMenu: {
            acceptReporters: false,
            items: [
              { text: "on", value: "on" },
              { text: "off", value: "off" }
            ]
          }
        }
      };
    }

    // --- Resistor
    setResistor(args) {
      let r = Number(args.OHMS);
      if (isNaN(r)) r = 1000;
      state.resistor.ohms = clamp(r, 1, 1e9);
    }
    getResistor() {
      return state.resistor.ohms;
    }

    // --- Power Supply
    setVoltage(args) {
      let v = Number(args.VOLTS);
      if (isNaN(v)) v = 5;
      state.power.volts = clamp(v, 0, 1000);
    }
    getVoltage() {
      return state.power.volts;
    }

    // --- LED
    toggleLED(args) {
      state.led.on = (args.STATE === "on");
    }
    ledIsOn() {
      return state.led.on;
    }

    // --- Derived: Current via Ohm's Law I = V / R
    calcCurrent() {
      const R = state.resistor.ohms;
      if (R === 0) return Infinity;
      return state.power.volts / R;
    }
  }

  Scratch.extensions.register(new ElectronicsBasics());
})(Scratch);
