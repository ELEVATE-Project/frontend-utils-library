export const sampleData = [
    {
        "name": "title",
        "label": {en:"Enter your name", hi: "अपना नाम दर्ज करें"},
        "value": "",
        "type": "text",
        "placeHolder": "Enter project title",
        "position": "floating",
        "viewOnly":true,
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
            "required": true,
            "min":0,
            "max":255
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
                "label": "Community",
                "value": "community"
            },
            {
                "label": "Education leader",
                "value": "education_leader"
            },
            {
                "label": "Infrastructure",
                "value": "infrastructure"
            },
            {
                "label": "School process",
                "value": "school_process"
            },
            {
                "label": "Student",
                "value": "student"
            },
            {
                "label": "Teacher",
                "value": "teacher"
            }
        ],
        "meta": {
            "entityType": "categories"
        },
        "multiple": false
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
            "required": true
        }
    },
    {
        "name": "recommented_duration",
        "label": "Recommended duration",
        "value": "",
        "class": "",
        "type": "subFields",
        "placeHolder": "",
        "subfields": [
            {
                "name": "number",
                "label": "Recommended duration",
                "value": "10",
                "class": "",
                "type": "text",
                "placeHolder": "Number",
                "position": "floating",
                "errorMessage": {
                    "required": "Enter duration ",
                    "pattern": "Enter duration in numbers"
                },
                "validators": {
                    "required": true,
                    "maxLength": 2,
                    "pattern": "^[0-9]+$"
                }
            },
            {
                "name": "duration",
                "label": "",
                "value": "days",
                "class": "",
                "type": "select",
                "isMultiSelect":"false",
                "placeHolder": "Weeks",
                "position": "floating",
                "errorMessage": {
                    "required": "Enter duration"
                },
                "validators": {
                    "required": true
                },
                "options": [
                    {
                        "label": "Days",
                        "value": "days"
                    },
                    {
                        "label": "Months",
                        "value": "months"
                    },
                    {
                        "label": "Weeks",
                        "value": "weeks"
                    }
                ],
                "meta": {
                    "entityType": "duration"
                },
                "multiple": false
            }
        ],
        "position": "floating",
        "validators": {
            "required": false
        }
    },
    {
        "name": "keywords",
        "label": "Add keywords",
        "value": "",
        "class": "",
        "type": "text",
        "placeHolder": "Add a tag",
        "position": "floating",
        "errorMessage": {
            "required": "Add a tag"
        },
        "validators": {
            "required": true,
            "maxLength": 255
        }
    },
    {
        "name": "recommeneded_for",
        "label": "Recommended for",
        "value": "",
        "class": "",
        "type": "select",
        "placeHolder": "Select role",
        "isMultiSelect":"false",
        "position": "floating",
        "errorMessage": {
            "required": "Select role"
        },
        "validators": {
            "required": true
        },
        "options": [
            {
                "label": "Education leader",
                "value": "education_leader"
            },
            {
                "label": "HM",
                "value": "hm"
            },
            {
                "label": "HT",
                "value": "ht"
            },
            {
                "label": "Teacher",
                "value": "teacher"
            }
        ],
        "meta": {
            "entityType": "recommeneded_for"
        },
        "multiple": false
    },
    {
        "name": "languages",
        "label": "Language",
        "value": "",
        "class": "",
        "type": "select",
        "placeHolder": "Select language",
        "isMultiSelect":"true",
        "position": "floating",
        "errorMessage": {
            "required": "Select language"
        },
        "validators": {
            "required": true
        },
        "options": [
            {
                "label": "English",
                "value": "en"
            },
            {
                "label": "Hindi",
                "value": "hi"
            }
        ],
        "meta": {
            "entityType": "languages"
        },
        "multiple": false
    },
    {
        "name": "learning_resources",
        "label": "Project resource (You can add learning resource(s) as a project level)",
        "value": "",
        "class": "",
        "icon": "add_circle",
        "type": "addResource",
        "textForLink": "Add learning resource(s)",
        "placeHolder": "",
        "position": "floating",
        "listIcon": "videocam_off",
        "listLabel": "Video information",
        "dialogData": {
            "header": "Add learning resource(s)",
            "headerCss": "flex flex-row justify-between items-center bg-[#0A4F9D] h-10",
            "resource": [
                [
                    {
                        "name": "name",
                        "label": "Name of the resource",
                        "value": "",
                        "class": "",
                        "type": "text",
                        "placeHolder": "Name",
                        "position": "floating",
                        "errorMessage": {
                            "required": "Enter name of the resource",
                        },
                        "validators": {
                            "required": true,
                            "maxLength":255
                        }
                    },
                    {
                        "name": "url",
                        "label": "Link to the resource",
                        "value": "",
                        "class": "",
                        "type": "text",
                        "placeHolder": "Link",
                        "position": "floating",
                        "errorMessage": {
                            "required": "Enter link to the resource",
                            "pattern":"Please add link to resource"
                        },
                        "validators": {
                            "required": true,
                            "pattern":"^https[:a-zA-Z0-9-?./\=]+$"
                        }
                    }
                ]
            ],
            "confirmButton": "Save",
            "cancelButton": "Cancel",
            "addButton": "Add learning resource(s)"
        },
        "errorMessage": {
            "required": "Enter project title"
        },
        "validators": {
            "required": true,
            "maxLength": 255
        }
    },
    {
        "name": "licenses",
        "label": "License",
        "value": "cc_by_nc",
        "class": "",
        "type": "select",
        "isMultiSelect":"false",
        "placeHolder": "Select license",
        "position": "floating",
        "errorMessage": {
            "required": "Select license"
        },
        "validators": {
            "required": true
        },
        "options": [
            {
                "label": "CC BY 4.0",
                "value": "cc"
            },
            {
                "label": "CC BY NC",
                "value": "cc_by_nc"
            },
            {
                "label": "CC BY NC ND",
                "value": "cc_by_nc_nd"
            },
            {
                "label": "CC BY NC SA",
                "value": "cc_by_nc_sa"
            },
            {
                "label": "CC BY ND",
                "value": "cc_by_nd"
            },
            {
                "label": "CC BY SA",
                "value": "cc_by_sa"
            }
        ],
        "meta": {
            "entityType": "licenses"
        },
        "multiple": false
    },
    {
        "name": "dates",
        "label": "Date",
        "value": "",
        "class": "",
        "type": "subFields",
        "placeHolder": "",
        "subfields": [
            {
                "name": "startDate",
                "label": "Start date",
                "value": "2024-12-16T18:30:00.000Z",
                "class": "",
                "type": "date",
                "placeHolder": "enter start date",
                "viewOnly":false,
                "position": "floating",
                "errorMessage": {
                    "required": "Enter start date "
                },
                "validators": {
                    "required": true
                }
            },
            {
                "name": "endDate",
                "label": "End date",
                "value": "",
                "class": "",
                "type": "date",
                "placeHolder": "enter end date",
                "position": "floating",
                "errorMessage": {
                    "required": "Enter end date "
                },
                "validators": {
                    "required": true
                }
            },
        ],
        "position": "floating",
        "validators": {
            "required": false
        }
    },
]