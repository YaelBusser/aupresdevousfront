import {Image, View} from "react-native";
import React from "react";
import styles from "./styles";
const Header = () => {
    const logo2 = require("../../assets/images/logo2.png")
    return (
        <View style={styles.containerLogo2}>
            <Image source={logo2} style={styles.logo2}/>
        </View>
    )
}

export default Header;