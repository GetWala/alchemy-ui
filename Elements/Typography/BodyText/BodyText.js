import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet
} from 'react-native';
import {
  AUI_COLORS,
} from "../../Colors/index";
import {AUI_TYPOGRAPHY} from "../fontStyles";

class BodyText extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const {
      children,
      color,
      ...props } = this.props;
    return(
      <Text
        {...props}
        style={[styles.text, this.props.style, color ? {color: color} : null]}
      >
        {children}
      </Text>
    );
  }
}

BodyText.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string
};

const styles = StyleSheet.create({
  text: {
    color: AUI_COLORS.Slate.hex,
    fontFamily: AUI_TYPOGRAPHY.ProximaNova.regular,
    fontSize: AUI_TYPOGRAPHY.typeScale.size16,
    lineHeight: AUI_TYPOGRAPHY.typeScale.size16lineHeight
  }
});

export {
  BodyText
}