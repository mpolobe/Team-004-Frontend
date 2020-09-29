import React from "react";
import AppConfig from "react-global-configuration";

AppConfig.set({
    environment: "develop",
    develop: {
        namespace: "afriteach_develop",
		frontendUrl: "",
		backendUrl: "https://africateach.herokuapp.com",
        uploadUrl: "",
        uploadPath: ""
    }
});

export default AppConfig;