import React from "react";
import AppConfig from "react-global-configuration";

AppConfig.set({
    environment: "develop",
    develop: {
        namespace: "afriteach_develop",
		frontend_url: "",
		backend_url: "",
        uploadUrl: "",
        uploadPath: ""
    }
});

export default AppConfig;