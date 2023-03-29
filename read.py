import json


def main():
    requestedDev = "Developer 8"
    with open('data.json') as f:
        data = json.load(f)
        # print(data)
        for i in range(len(data)):
            if requestedDev in data[i]["Developers"]:
                print(data[i])
    
    f.close()
    
main()