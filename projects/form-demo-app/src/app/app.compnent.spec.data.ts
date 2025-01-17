export const sampleData = [
    {
        "name": "title",
        "label": {en:"Enter your name", hi: "अपना नाम दर्ज करें"},
        "value": "",
        "type": "text",
        "placeHolder": "Ex. John",
        "errorMessage": {
            "required": {en:"Enter your name", hi: "अपना नाम दर्ज करें"},
            "minlength":{en:"Min length should be 5", hi: "न्यूनतम लंबाई 5 होनी चाहिए"},
        },
        "validators": {
            "required": true,
            "minLength": 10
        }
    },
    {
        "name": "description",
        "label": {en:"Description", hi: "विवरण"},
        "value":"",
        "type": "textarea",
        "placeHolder": {en:"Tell the community something about yourself", hi: "समुदाय को अपने बारे में कुछ बताएं"},
        "errorMessage": {
            "required": {en:"Enter description", hi: "विवरण दर्ज करें"}
        },
        "validators": {
            "required": false,
            "maxLength": 255
        }
    },
    {
        "name": "password",
        "label": {en:"Enter the password", hi: "पासवर्ड दर्ज करें"},
        "value":"",
        "type": "password",
        "placeHolder": {en:"Type your password here", hi: "यहां अपना पासवर्ड टाइप करें"},
        "errorMessage": {
            "required": {en:"Password is required", hi: "पासवर्ड आवश्यक है"},
        },
        "validators": {
            "required": false,
        }
    },
    {
        "name": "location",
        "label": {en:"Select your location", hi: "अपना स्थान चुनें"},
        "value":"",
        "type": "select",
        "errorMessage": {
            "required": {en:"Please select your location", hi: "कृपया अपना स्थान चुनें"}
        },
        "validators": {
            "required": false
        },
        "options": [
            {
                "label": "Andhra Pradesh",
                "value": "ap"
            },
            {
                "label": "Arunachal Pradesh",
                "value": "ar"
            },
            {
                "label": "Assam",
                "value": "as"
            },
            {
                "label": "Bihar",
                "value": "br"
            },
            {
                "label": "Chhattisgarh",
                "value": "cg"
            },
            {
                "label": "Goa",
                "value": "ga"
            },
        ],
        "meta": {
            "entityType": "location",
            "errorLabel": "Location"
        },
        "multiple": false
    },
    {
        "name": "recommended_for",
        "label": {en:"Recommended for", hi: "के लिए अनुशंसित"},
        "value":"",
        "type": "chip",
        "disabled": false,
        "errorMessage": {
            "required": {en:"Enter recommended for", hi: "के लिए अनुशंसा दर्ज करें"}
        },
        "validators": {
            "required": false
        },
        "options": [
            {
                "label": "Block education officer",
                "value": "beo"
            },
            {
                "label": "Cluster officials",
                "value": "co"
            },
            {
                "label": "District education officer",
                "value": "deo"
            },
            {
                "label": "Head master",
                "value": "hm"
            },
            {
                "label": "Teacher",
                "value": "te"
            }
        ],
        "meta": {
            "entityType": "recommended_for",
            "addNewPopupHeader": "Recommended for",
            "addNewPopupSubHeader": "Who is this session for?",
            "showSelectAll": true,
            "showAddOption": true
        },
        "multiple": true
    },
    {
        "name": "range_value",
        "label": {en:"Select difficulty level", hi: "कठिनाई स्तर चुनें"},
        "value":"0",
        "type": "range",
        "min": "0",
        "max": "50",
        "step": "1",
        "placeHolder": {en:"Select a range value", hi: "एक श्रेणी मान चुनें"},
        "errorMessage": {
            "required": "Select a value"
        },
        "validators": {
            "required": false
        },
        "showThumbLabel":true
    },
    {
        "name": "rating",
        "label": {en:"How do you rate this", hi: "आप इसे कैसे रेट करेंगे"},
        "value":"",
        "type": "rating",
        "errorMessage": {
            "required": {en:"Select a rating value", hi: "रेटिंग मान चुनें"}
        },
        "validators": {
            "required": false
        },
        "noOfstars":5
    },
    {
        "name": "categories",
        "label": {en:"Checkbox Input", hi: "चेकबॉक्स इनपुट"},
        "value":"",
        "type": "checkbox",
        "errorMessage": {
            "required": {en:"Select a category", hi: "एक श्रेणी चुनें"}
        },
        "validators": {
            "required": false
        },
        "options": [
            {
                "label": "Block education officer",
                "value": "beo"
            },
            {
                "label": "Cluster officials",
                "value": "co"
            },
            {
                "label": "District education officer",
                "value": "deo"
            },
            {
                "label": "Head master",
                "value": "hm"
            },
            {
                "label": "Teacher",
                "value": "te"
            },
            {
                "label": "District education officer",
                "value": "deo"
            }
        ]
    },
    {
        "name": "gender",
        "label": {en:"Radio Input", hi: "रेडियो इनपुट"},
        "value":"",
        "type": "radio",
        "errorMessage": {
            "required": {en:"Select a value", hi: "एक मान चुनें"}
        },
        "validators": {
            "required": true
        },
        "options": [
            {
                "label": "Male",
                "value": "m"
            },
            {
                "label": "female",
                "value": "f"
            },
            {
                "label": "not to disclose",
                "value": "n"
            }
        ]
    },
    {
        "name": "accept",
        "label": {en:"Terms and conditions", hi: "नियम और शर्तें"},
        "value": false,
        "type": "toggle",
        "errorMessage": {
            "required": {en:"You need to accept", hi: "आपको स्वीकार करना होगा"}
        },
        "validators": {
            "required": false
        }
    }
]