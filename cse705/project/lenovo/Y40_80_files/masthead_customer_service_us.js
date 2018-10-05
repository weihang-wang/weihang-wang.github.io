var MashteadCustomerServiceChat = setInterval(function() {
    if(typeof(RightNow) != "undefined") {
        try {
            RightNow.Client.Controller.addComponent({
                    chat_login_page: "/app/chat/chat_launch_customerservice",
                    chat_login_page_height: 641,
                    chat_login_page_width: 400,
                    container_element_id: "MastheadChatCustomerContainer",
                    enable_availability_check: false,
                    enable_polling: false,
                    info_element_id: "MastheadChatCustomerLinkInfo",
                    label_default: "Chat online",
                    link_element_id: "MastheadChatCustomerLink",
                    wait_threshold: 0,
                    instance_id: "masthead_contact_customer_us",
                    module: "ConditionalChatLink",
                    type: 7
                },
                "https://lenovoservice.widget.custhelp.com/ci/ws/get"
            );
        } catch(e) {
            if(window.console) {
                console.log(e.stack);
            }
        }

        clearInterval(MashteadCustomerServiceChat);
    } else {
        console.log("EE: Taking more time...");
    }
}, 1000);