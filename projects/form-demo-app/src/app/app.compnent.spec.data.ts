export const sampleData = [
    {
        "name": "title",
        "label": "Enter your name",
        "value": "",
        "type": "text",
        "placeHolder": "Ex. John",
        "errorMessage": {
            "required": "Enter your name",
            "minlength":"Min length should be 5",
        },
        "validators": {
            "required": true,
            "minLength": 10
        }
    },
    {
        "name": "description",
        "label": "Description",
        "value":"",
        "type": "textarea",
        "placeHolder": "Tell the community something about yourself",
        "errorMessage": {
            "required": "Enter description"
        },
        "validators": {
            "required": false,
            "maxLength": 255
        }
    },
    {
        "name": "password",
        "label": "Enter the password",
        "value":"",
        "type": "password",
        "placeHolder": "Type your password here",
        "errorMessage": {
            "required": "Password is required",
        },
        "validators": {
            "required": false,
        }
    },
    {
        "name": "location",
        "label": "Select your location",
        "value":"",
        "type": "select",
        "errorMessage": {
            "required": "Please select your location"
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
        "label": "Recommended for",
        "value": [{
            "label": "Block education officer",
            "value": "beo"
        },
        {
            "label": "Cluster officials",
            "value": "co"
        }],
        "type": "chip",
        "disabled": false,
        "errorMessage": {
            "required": "Enter recommended for"
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
        }
    },
    {
        "name": "range_value",
        "label": "Select difficulty level",
        "value":"0",
        "type": "range",
        "min": "0",
        "max": "50",
        "step": "1",
        "placeHolder": "Select a range value",
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
        "label": "How do you rate this",
        "value":"",
        "type": "rating",
        "errorMessage": {
            "required": "Select a rating value"
        },
        "validators": {
            "required": false
        },
        "noOfstars":5
    },
    {
        "name": "categories",
        "label": "Checkbox Input",
        "value":"",
        "type": "checkbox",
        "errorMessage": {
            "required": "Select a category"
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
        "label": "Radio Input",
        "value":"",
        "type": "radio",
        "errorMessage": {
            "required": "Select a value"
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
        "label": "Terms and conditions",
        "value": false,
        "type": "toggle",
        "errorMessage": {
            "required": "You need to accept"
        },
        "validators": {
            "required": false
        }
    }
]