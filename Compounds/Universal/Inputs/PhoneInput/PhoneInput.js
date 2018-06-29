import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, TouchableOpacity, InteractionManager } from 'react-native';
import { Container, Caption1, Caption2, Spacer, AUI_COLORS, AUI_LAYOUT, AUI_TYPOGRAPHY } from '../../../../Elements/index';
import { AUI_FUNCTIONS } from "../../../../Helpers/index";

import CountryPicker from 'react-native-country-picker-modal';
import {Icons} from "../../../../Elements/index";

class PhoneInput extends Component {
  constructor(props) {
    super(props);
  }

  focus() {
    this.input.focus();
  }

  focusCountryPicker() {
    this.countryPicker.openModal();
  }

  render() {
    const {
      cca2,
      onChangeCountry,
      searchable,
      closeable,
      countries,
      phoneNumber,
      onChangePhoneText,
      returnKeyType,
      next,
      blurOnSubmit,
      addContacts,
      onAddContactsSelect,
      error
    } = this.props;

    return (
      <Container>
        <Caption1 style={{color: AUI_COLORS.Iron.hex}}>{'Mobile Phone'}</Caption1>
        <Container
          actAsRow={cca2 ? true : false}
          style={[styles.inputWrapper, error ? {borderBottomColor: AUI_COLORS.TorchRed.hex} : null]}
        >
          <CountryPicker
            ref={countryPicker => (this.countryPicker = countryPicker)}
            cca2={cca2}
            closeable={closeable}
            searchable={searchable}
            showLetters
            phoneSelector
            enableEmptySections
            requiredCountries={countries}
            onChange={(value) => {
              onChangeCountry(value);

              InteractionManager.runAfterInteractions(() => {
                this.focus();
              });
            }}
            pickerIcon={<Icons
              iconSet={'material-design'}
              iconName={'phone'}
              iconSize={26}
              iconColor={AUI_COLORS.WalaTeal.hex} />}
          />
          <TextInput
            ref={input => (this.input = input)}
            value={phoneNumber}
            placeholder={'Phone number'}
            placeholderTextColor={AUI_COLORS.Iron.hex}
            style={styles.input}
            underlineColorAndroid={'transparent'}
            keyboardType={'phone-pad'}
            defaultValue={phoneNumber}
            onChangeText={(value) => {
              onChangePhoneText(value);
            }}
            returnKeyType={returnKeyType}
            blurOnSubmit={blurOnSubmit}
            onSubmitEditing={next}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => { 
              InteractionManager.runAfterInteractions(() => {
                this.input.focus(); 
              })
            }}
          >
            <Icons
              iconSet={'material-design'}
              iconName={'phone'}
              iconSize={26}
              iconColor={AUI_COLORS.WalaTeal.hex}
            />
          </TouchableOpacity>
          {addContacts && (
            <Container>
              <TouchableOpacity
                style={styles.contactIcon}
                onPress={() => { onAddContactsSelect ? onAddContactsSelect() : null; }}
              >
                <Icons
                  iconSet={'material-design'}
                  iconName={'contacts'}
                  iconSize={26}
                  iconColor={AUI_COLORS.WalaTeal.hex}
                />
              </TouchableOpacity>
            </Container>
          )}
        </Container>
        {error &&
        <Container style={styles.error}>
          <Caption2 style={styles.errorText}>{error}</Caption2>
        </Container>
        }
        <Spacer/>
      </Container>
    );
  }
}

PhoneInput.defaultProps = {

};

PhoneInput.propTypes = {
  cca2: PropTypes.string,
  searchable: PropTypes.bool,
  onChangeCountry: PropTypes.func.isRequired,
  onChangePhoneText: PropTypes.func.isRequired,
  addContacts: PropTypes.bool
};

const styles = StyleSheet.create({
  inputWrapper: {
    height: AUI_FUNCTIONS.gridBaseMultiplier(6, true),
    borderBottomWidth: 1,
    borderBottomColor: AUI_COLORS.Slate.hex
  },
  input: {
    flex: 1,
    fontFamily: AUI_TYPOGRAPHY.ProximaNova.semibold,
    color: AUI_COLORS.Charcoal.hex,
    fontSize: AUI_TYPOGRAPHY.typeScale.size16,
    paddingLeft: 9,
    marginTop: -5
  },
  icon: {
    marginTop: 10
  },
  contactIcon: {
    marginTop: 8,
    marginLeft: 13,
    paddingLeft: 13,
    height: 26,
    borderLeftWidth: 1,
    borderLeftColor: AUI_COLORS.Silver.hex
  },
  error: {
    marginTop: 4
  },
  errorText: {
    color: AUI_COLORS.TorchRed.hex
  }
});

export  {
  PhoneInput
}