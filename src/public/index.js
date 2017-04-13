$(document).ready(function(){
    var username = "";
    username = prompt("Please enter your name");

    if (!username) {
        alert("You should enter a name");
        username = prompt("Please enter your name", "Harry");
    }

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('da857397f8eec3092630', {
        cluster: 'eu',
        encrypted: false
    });

    var channel = pusher.subscribe('public-chat');
    channel.bind('message-added', onMessageAdded);

    $('#btn-chat').click(function(){
        //get message
        const message = $("#message").val();
        //clear textarea
        $("#message").val("");

        //send message
        $.post( "http://localhost:5000/message", { username: username, message: message } );
    });

    function onMessageAdded(data) {
        //add me message-template to UI
        let template = $("#new-message").html();
        template = template.replace("{{body}}", data.message);
        template = template.replace("{{name}}", data.username);

        $(".chat").append(template);
    }
});