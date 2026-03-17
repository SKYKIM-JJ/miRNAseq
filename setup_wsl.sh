#!/bin/bash
# WSL Ubuntu 24.04 setup script for miRNAseq project
# Includes Kiro IDE WSL integration

set -e

echo "=== miRNAseq WSL Setup ==="

# 1. Kiro WSL Server Setup
KIRO_COMMIT="0392458edac4313d9611c8a298782c15ddd3138b"
KIRO_SERVER_DIR="$HOME/.kiro-server/bin/${KIRO_COMMIT}"

if [ ! -f "$KIRO_SERVER_DIR/bin/kiro-server" ]; then
    echo "[1/3] Installing Kiro WSL server..."
    mkdir -p "$KIRO_SERVER_DIR"
    SERVER_URL="https://prod.download.desktop.kiro.dev/releases/remotes/${KIRO_COMMIT}/kiro-reh-linux-x64.tar.gz"
    curl -L -o /tmp/kiro-server.tar.gz "$SERVER_URL"
    tar -xzf /tmp/kiro-server.tar.gz -C "$KIRO_SERVER_DIR" --strip-components=1
    rm -f /tmp/kiro-server.tar.gz
    echo "Kiro WSL server installed."
else
    echo "[1/3] Kiro WSL server already installed."
fi

# 2. Install Kiro WSL extension (if not already installed)
KIRO_EXT_DIR="$HOME/.kiro/extensions"
if [ ! -d "$KIRO_EXT_DIR/ms-vscode-remote.remote-wsl-"* ] 2>/dev/null; then
    echo "[2/3] Installing Kiro WSL extension..."
    ELECTRON="/mnt/c/Users/Genomics/AppData/Local/Programs/Kiro/Kiro.exe"
    export WSLENV="ELECTRON_RUN_AS_NODE/w:$WSLENV"
    CLI=$(wslpath -m "/mnt/c/Users/Genomics/AppData/Local/Programs/Kiro/resources/app/out/cli.js")

    # Download and install MS Remote WSL extension
    curl -L -o /tmp/ms-remote-wsl.vsix.gz \
        "https://marketplace.visualstudio.com/_apis/public/gallery/publishers/ms-vscode-remote/vsextensions/remote-wsl/0.88.5/vspackage"
    gunzip -f /tmp/ms-remote-wsl.vsix.gz
    mv /tmp/ms-remote-wsl.vsix "/mnt/c/Users/Genomics/Downloads/ms-remote-wsl.vsix"
    ELECTRON_RUN_AS_NODE=1 "$ELECTRON" "$CLI" --install-extension "C:\\Users\\Genomics\\Downloads\\ms-remote-wsl.vsix"
    rm -f "/mnt/c/Users/Genomics/Downloads/ms-remote-wsl.vsix"
    echo "WSL extension installed."
else
    echo "[2/3] WSL extension already installed."
fi

# 3. Verify setup
echo "[3/3] Verifying setup..."
if command -v kiro &>/dev/null; then
    echo "Kiro CLI: $(kiro --version 2>/dev/null | head -1)"
    echo "Usage: Run 'kiro .' from any WSL directory to open in Kiro"
else
    echo "WARNING: 'kiro' command not found in PATH"
    echo "Add to ~/.bashrc: export PATH=\"\$PATH:/mnt/c/Users/Genomics/AppData/Local/Programs/Kiro/bin\""
fi

echo ""
echo "=== Setup complete ==="
echo "Open this project: kiro /mnt/c/Users/Genomics/AI_OMICS/miRNAseq"
