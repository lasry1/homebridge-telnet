# homebridge-telnet
I don't even know anymore.

## Setup

 1. Install homebridge (`npm install homebridge -g`)
 2. Install homebridge-telnet (`npm install homebridge-telnet -g`)
 3. Change your config file.
 
## The config file

An example:
```json
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:30",
        "port": 51826,
        "pin": "031-45-154"
    },
    
    "description": "This is an example configuration file with homebridge-telnet. You can use this as a template for creating your own configuration file containing devices you actually own.",

    "accessories": [
        {
            "accessory": "telnet",
            "name": "Coffee Maker",
            "port": 23,
            "shellPrompt": "/ # ",
            "timeout": 1500
        }
    ]
}
```
