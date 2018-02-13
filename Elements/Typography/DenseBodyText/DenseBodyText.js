import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet
} from 'react-native';
import {
  AUI_COLORS
} from "../../index";
import {AUI_TYPOGRAPHY} from "../fontStyles";

class DenseBodyText extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const {
      children,
      ...props } = this.props;
    return(
      <Text
        {...props}
        style={[styles.text, this.props.style]}
      >
        {children}
      </Text>
    );
  }
}

DenseBodyText.propTypes = {
  children: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  text: {
    color: AUI_COLORS.Slate.hex,
    fontFamily: AUI_TYPOGRAPHY.ProiximaNova.regular,
    fontSize: AUI_TYPOGRAPHY.typeScaleDense.size14,
    lineHeight: AUI_TYPOGRAPHY.typeScaleDense.size16lineHeight
  }
});

export {
  DenseBodyText
}