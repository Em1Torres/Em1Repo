# Implentation of cipher Ceasar
# Consists of shifting a word's letter or sentence n amount of spaces
def decipher_ceasar(str, key):
    lowStr=str.lower()
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    decipher = ""
    for i in range(len(lowStr)): 
        if(lowStr[i] == " " or lowStr[i] == "."):
            decipher = decipher + ""
        else: 
            pos = alphabet.find(lowStr[i])
            shift = alphabet[(pos - key) % len(alphabet)]
            decipher = decipher + shift
    return decipher

def cipher_ceasar(str, key):
    lowStr=str.lower()
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    cipher = ""
    for i in range(len(lowStr)): 
        if(lowStr[i] == " " or lowStr[i] == "."):
            cipher = cipher + ""
        else: 
            pos = alphabet.find(lowStr[i])
            shift = alphabet[(pos + key) % len(alphabet)]
            cipher = cipher + shift
    return cipher


key  = int(input("Enter desired key for encryption: "))
message = input("Enter message: ")
only_cipher = cipher_ceasar(message,key)
cipher = ("Encrypted message: " + only_cipher)
decipher = ("Decrypted message: " + decipher_ceasar(only_cipher,key))
print(cipher)
print(decipher)
