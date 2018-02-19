import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import {
  Container,
  SmallDisplay,
  Subhead1,
  Caption1,
  CallToActionButton,
  Icons,
  Divider,
  AUI_COLORS,
} from '../../Elements';
import {
  AUI_FUNCTIONS
} from "../../Helpers";

class BottomSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
    };
  }

  _openBottomSheet() {
    this.refs.bottomSheet.open();
  }

  _closeBottomSheet() {
    this.refs.bottomSheet.close();
  }

  render() {
    const { header, description, options } = this.props;

    const actions = options.map(function(option, i) {
      return (
        <TouchableNativeFeedback
          key={i}
          onPress={() => {
            option.onPress();
          }}>
          <Container actAsRow style={localStyles.bottomSheetAction}>
            <Subhead1 style={localStyles.bottomSheetActionText}>{option.label}</Subhead1>
            <Icons
              variation={'material-design'}
              iconName={'chevron-right'}
              size={24}
              iconColor={AUI_COLORS.WalaTeal.hex}
            />
          </Container>
        </TouchableNativeFeedback>
      );
    });

    return (
      <Modal
        style={[localStyles.bottomSheet]}
        position={'bottom'}
        ref={'bottomSheet'}
        coverScreen
        backdropOpacity={0.8}
        backdropColor={AUI_COLORS.Charcoal.getRgba(0.8)}>
        {header && (
          <Container style={localStyles.bottomSheetHeader}>
            <SmallDisplay style={{ color: AUI_COLORS.ScampiPurple.tint4 }}>
              {header.toUpperCase()}
            </SmallDisplay>
          </Container>
        )}
        {description && (
          <Container style={localStyles.bottomSheetQuestion}>
            <Caption1>{description}</Caption1>
          </Container>
        )}
        {actions}
        <Divider size={'large'} />
        <Container actAsRow style={localStyles.bottomSheetCancel}>
          <CallToActionButton
            onPress={() => {
              this.refs.bottomSheet.close();
            }}
            label={'Cancel'}
            variation={'secondary'}
          />
        </Container>
      </Modal>
    );
  }
}

BottomSheet.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array,
  reference: PropTypes.string,
};

const localStyles = StyleSheet.create({
  bottomSheet: {
    height: null,
  },
  bottomSheetHeader: {
    backgroundColor: AUI_COLORS.ScampiPurple.hex,
    height: AUI_FUNCTIONS.gridBaseMultiplier(3),
    justifyContent: 'center',
    paddingLeft: AUI_FUNCTIONS.gridBaseMultiplier(),
  },
  bottomSheetQuestion: {
    padding: AUI_FUNCTIONS.gridBaseMultiplier(),
  },
  bottomSheetAction: {
    paddingHorizontal: AUI_FUNCTIONS.gridBaseMultiplier(),
    height: AUI_FUNCTIONS.gridBaseMultiplier(4),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: AUI_COLORS.Silver.hex,
  },
  bottomSheetActionText: {
    color: AUI_COLORS.Charcoal.hex,
    flex: 1,
  },
  bottomSheetCancel: {
    padding: AUI_FUNCTIONS.gridBaseMultiplier(),
  },
});


export {
  BottomSheet
}