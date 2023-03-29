import json


def main():
    with open('data.json', "r+") as f:
        data = json.load(f)
        
        currentId = len(data)
        
        newData = {
        "productId": currentId +1,
        "productName": "ProductX",
        "productOwnerName": "OwnerX",
        "Developers": [
            "Developer_1",
            "Developer_6",
            "Developer_7",
            "Developer_8",
            "Developer_9"
        ],
        "scrumMasterName": "Scrum_Master_1",
        "startDate": "2022/03/27",
        "methodology": "Agile"
    }
        data.append(newData)
        # with open('data.json', "w") as writeF:
        json.dump(data, f)
        
            
        
    f.close()
    
main()