export const sampleData = [
    {
        "name": "title",
        "label": "Project title",
        "value": "asfs",
        "class": "",
        "type": "text",
        "placeHolder": "Enter project title",
        "position": "floating",
        "viewOnly":true,
        "errorMessage": {
            "required": "Enter project title",
            "maxLength":"Length exceeded"
        },
        "validators": {
            "required": true,
            "maxLength": 255
        }
    },
    {
        "name": "number",
        "label": "Project title",
        "value": '',
        "class": "",
        "type": "number",
        "placeHolder": "Enter number",
        "position": "floating",
        "errorMessage": {
            "required": "Enter number"
        },
        "validators": {
            "required": true,
            "min":0,
            "max":255
        }
    },
    {
        "name": "categories",
        "label": "Category",
        "value":"community",
        "class": "",
        "type": "select",
        "isMultiSelect":"false",
        "placeHolder": "Add project category",
        "position": "floating",
        "errorMessage": {
            "required": "Add project category"
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
        "name": "objective",
        "label": "Objective",
        "value": "",
        "class": "",
        "type": "textarea",
        "placeHolder": "Summarize the goal of the project",
        "position": "floating",
        "errorMessage": {
            "required": "Summarize the goal of the project"
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