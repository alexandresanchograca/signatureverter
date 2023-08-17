function copyAob() {
    // Get the text field
    var copyText = document.getElementById("aobOutput").innerHTML;

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);

    alert("Copied: " + copyText);
}

function copyIda() {
    // Get the text field
    var copyText = document.getElementById("idaOutput").innerHTML;

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);

    alert("Copied: " + copyText);

}

function copyMask() {
    // Get the text field
    var copyText = document.getElementById("maskOutput").innerHTML;

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);

    alert("Copied: " + copyText);

}

function CopiedMessage() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}

function RemoveEmptySpaces(signature) {
    return signature.replaceAll(' ', '');
}

function GenerateIdaSignature(aobSignature) {
    var idaOutputSig = "";

    for (var i = 0; i < aobSignature.length; i += 4) { //We check in an iteration of 4 \xFF
        if (aobSignature[i + 2] == '0' && aobSignature[i + 3] == '0') {
            idaOutputSig += ('?? ');
        }
        else {
            idaOutputSig += (`${aobSignature[i + 2] + aobSignature[i + 3]} `);
        }
    }
    return idaOutputSig.trimEnd();
}

function GenerateArrayOfByteSignature(idaSignature) {
    var massageSig = RemoveEmptySpaces(idaSignature);
    var AobByteSig = "";

    for (var i = 0; i < massageSig.length; i += 2) { //We check in an iteration of 2 hexadecimal values, this is because 1 hexadecimal represents 4 bits, 8 bits == 1 byte
        if (massageSig[i] == '?' && massageSig[i + 1] == '?') {
            AobByteSig += ('\\x00');
        }
        else {
            AobByteSig += (`\\x${massageSig[i] + massageSig[i + 1]}`);
        }

    }
    return AobByteSig;
}

function GenerateMask(signature) {
    var massageSig = RemoveEmptySpaces(signature);
    var maskOutput = "";

    for (var i = 0; i < massageSig.length; i += 2) { //Each of the masked values represents 1 byte. ? when the byte value it's not 0
        if (massageSig[i] == '?' && massageSig[i + 1] == '?') {
            maskOutput += ('?');
        }
        else if (massageSig[i] == '0' && massageSig[i + 1] == '0') {
            maskOutput += ('?');
        }
        else {
            maskOutput += (`x`);
        }
    }
    return maskOutput;
}

function ProcessData() {
    var idaSig = document.getElementById("idaSig");
    var aobSig = document.getElementById("aobSig");
    var jogo = document.getElementsByName(`radiojogo`)


    document.getElementById("aobOutput").innerHTML = GenerateArrayOfByteSignature(idaSig.value);
    document.getElementById("idaOutput").innerHTML = GenerateIdaSignature(aobSig.value);

    if (!idaSig.value.empty)
        document.getElementById("maskOutput").innerHTML = GenerateMask(idaSig.value);
    else
        document.getElementById("maskOutput").innerHTML = GenerateMask(GenerateIdaSignature(aobSig.value));

}