import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { TextField as Input } from 'react-native-material-textfield';

import { Container, Caption, Spacer, AUI_COLORS, AUI_LAYOUT, AUI_TYPOGRAPHY } from '../../../../Elements/index';

class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      underlineColor: AUI_COLORS.Iron.hex
    };
  }

  focus() {
    this.textInput.focus();
    this.props.onFocus && this.props.onFocus();
  }

  onBlur() {
    this.props.onBlur && this.props.onBlur();
    this.setState({
      underlineColor: AUI_COLORS.Iron.hex
    });
  }

  onFocus() {
    this.props.onFocus && this.props.onFocus();
    this.setState({
      underlineColor: AUI_COLORS.WalaTeal.hex
    });
  }

  render() {
    const {
      label,
      value,
      title,
      error,
      ...props
    } = this.props;

    return (
      <Container style={{paddingBottom: (title) ? 0 : 2}}>
        <Input
          ref={textInput => (this.textInput = textInput)}
          {...props}
          label={label}
          value={value}
          title={title}
          error={error}
          labelHeight={20}
          labelPadding={9}
          fontSize={16}
          textColor={AUI_COLORS.Charcoal.hex}
          tintColor={AUI_COLORS.WalaTeal.hex}
          baseColor={AUI_COLORS.Slate.hex}
          errorColor={AUI_COLORS.TorchRed.hex}
          labelTextStyle={styles.labelTextStyle}
          titleTextStyle={[styles.titleTextStyle, (error) ? null : {color: AUI_COLORS.Iron.hex}]}
          affixTextStyle={styles.affixTextStyle}
          style={styles.inputText}
          lineWidth={1}
          onBlur={() => {
            this.onBlur();
          }}
          onFocus={() => {
            this.onFocus();
          }}
          inputContainerStyle={{borderBottomColor: this.state.underlineColor}}
        />
      </Container>
    );
  }
}

TextField.defaultProps = {

};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  title: PropTypes.string,
  error: PropTypes.string
};

const styles = StyleSheet.create({
  labelTextStyle: {
    fontFamily: AUI_TYPOGRAPHY.ProximaNova.semibold,
    color: AUI_COLORS.Slate.hex
  },
  titleTextStyle: {
    fontFamily: AUI_TYPOGRAPHY.ProximaNova.regular_italic,
    color: AUI_COLORS.Slate.hex
  },
  affixTextStyle: {
    color: AUI_COLORS.Iron.hex
  },
  inputText: {
    fontFamily: AUI_TYPOGRAPHY.ProximaNova.semibold,
    lineHeight: AUI_TYPOGRAPHY.typeScale.size16lineHeight
  }
});

export  {
  TextField
}