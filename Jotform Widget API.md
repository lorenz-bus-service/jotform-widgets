# Jotform Custom Widget API

Jotform Custom Widget API allows developers to implement new form fields to be used in Form Builder.We achieved this by leveraging postMessage and cross-document messaging. That means Jotform Custom Widget API provides a bridge between your widget and Jotform.

[Original](https://www.jotform.com/developers/widgets/)

## Events

### JFCustomWidget.subscribe("ready", callback)
This event will be fired when form is ready and your field iframe loaded successfully. It will pass following parameters to your callback function.

`formId`
ID of form in which your custom field is used. Most widgets do not need to use this information. For example if you have a chat widget you can use formId as chat room ids.

Type: string

`value`
Submitted value alue of your widget. This attribute is particularly useful when users edit submissions. You can initialize your widget according to this value.

Tip: You must and always listen to this event before you begin to write your widget code. This is to ensure that the settings for your widgets was successfully fetched.

Type: string

### JFCustomWidget.subscribe("submit", callback)
This event will be fired when form is submitted or when the 'Next' button is pressed which is only available for multi-page forms(page-breaks).

Example callback function can be:

```javascript
function() {
    var result = {}
    //this part will be used if your field is required. If your widget is required valid
    //property will be expected before form can be submitted
    result.valid = true;
    //this is your field result. You are expected to send value property as string
    result.value = "my precious data"
    //most probably you will call sendSubmit method
    JFCustomWidget.sendSubmit(result)
}
```

Tip: If your widget is only for showing something to your users. You don't have to listen to this event.

## Methods

### JFCustomWidget.sendData(data)
You can use this method to send your field's results to Jotform at anytimedata object should include following attributes

`value`
This is your actual field result. It should be string (may be stringified JSON data).

Type: `string`

### JFCustomWidget.sendSubmit(data)
Use this method if you subscribed to "submit event". It is similar to sendData except you should send "valid" attribute in data. You should use this method if you want your widget to be able to be required.data object should include following attributes:

`valid`
If valid is true then your field will pass required condition in Jotform.  You should always pass valid, this way we can make your widget required.

Type: `boolean` 
Default: `false`

`value`
This is your actual field result. It should be `string` (may be stringified JSON data)

Type: `string`
