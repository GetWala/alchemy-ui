import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';
import {
  Container,
  Caption,
  Subheadline,
  Icons,
  Spacer,
  Avatar,
  AUI_COLORS,
  AUI_LAYOUT
} from '../../../Elements/index';
import {
  AUI_CONSTANTS,
  AUI_FUNCTIONS
} from '../../../Helpers/index';
import Swipeable from 'react-native-swipeable-row';

class ConnectionUserItem extends Component {
  constructor(props) {
    super(props);
  }

  renderRightButtons = (buttons, itemHeight) => {
    const renderedButtons = buttons ? buttons.map((btn, idx) => {
      return(
        <TouchableNativeFeedback key={idx} onPress={btn.onPress}>
          <Container
            alignItems={'center'}
            justifyContent={'center'}
            style={[
              {
                width: itemHeight,
                height: itemHeight - AUI_CONSTANTS.gridBase,
                paddingTop: 2
              },
              AUI_LAYOUT.roundCorners,
              AUI_LAYOUT.elevation2,
              styles.swipeButton
            ]}>
            <Icons
              iconName={btn.iconName}
              iconSet={btn.iconSet ? btn.iconSet : 'wala'}
              iconColor={AUI_COLORS.WalaTeal.hex}
              iconSize={21}
            />
            <Caption style={{marginTop: 1}} dense color={AUI_COLORS.WalaTeal.shade2}>{btn.label.toUpperCase()}</Caption>
          </Container>
        </TouchableNativeFeedback>
      );
    }) : null;

    return [
      <Container
        actAsRow
        alignItems={'center'}
        style={[
          {height: itemHeight},
          styles.swipeButtonTrack,
          AUI_LAYOUT.roundCorners
        ]}
      >
        {renderedButtons}
      </Container>
    ];
  };

  renderAvatar = (user) => {
    if(user.profileImage) {
      return(
        <Avatar
          variation={'image'}
          imageSource={{uri: user.profileImage}}
          size={'small'}
        />
      );
    } else {
      return(
        <Avatar
          variation={'initials'}
          initials={`${user.firstName.charAt(0)}${user.surname.charAt(0)}`}
          size={'small'}
        />
      );
    }
  };

  render(){
    const {onRef, user, swipeActions, onPress, isFavourite, favouriteOnPress, bounceOnMount} = this.props;
    const itemHeight = AUI_FUNCTIONS.gridBaseMultiplier(5);
    const rightSwipeButtons = swipeActions ? this.renderRightButtons(swipeActions, itemHeight) : null;
    const rightButtonsWidth = swipeActions ? (itemHeight * swipeActions.length) + 8 + (8 * swipeActions.length) : null;
    const avatar = this.renderAvatar(user);

    return(
      <Swipeable
        onRef={onRef}
        bounceOnMount={bounceOnMount}
        rightButtons={rightSwipeButtons}
        rightButtonWidth={rightButtonsWidth}
      >
        <TouchableNativeFeedback onPress={onPress}>
          <Container
            alignItems={'center'}
            actAsRow
            variation={'wide'}
            style={[
              AUI_LAYOUT.presets.card,
              {height: itemHeight, marginBottom: 4}
            ]}
          >
            {avatar}
            <Spacer dense horizontal />
            <Subheadline color={AUI_COLORS.Charcoal.hex} isFlex>{`${user.firstName} ${user.surname}`}</Subheadline>
            {favouriteOnPress &&
            <TouchableNativeFeedback onPress={favouriteOnPress}>
              <Container justifyContent={'center'} style={[{height: itemHeight}, styles.favoriteButton]}>
                <Icons
                  iconName={isFavourite ? 'star' : 'star-border'}
                  iconSize={21}
                  iconColor={AUI_COLORS.WalaTeal.hex}
                  iconSet={'material-design'}
                />
              </Container>
            </TouchableNativeFeedback>
            }
          </Container>
        </TouchableNativeFeedback>
      </Swipeable>
    );
  }
}

ConnectionUserItem.propTypes = {
  user: PropTypes.object.isRequired,
  swipeActions: PropTypes.array,
  onPress: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool,
  favouriteOnPress: PropTypes.func,
  bounceOnMount: PropTypes.bool
};

const styles = StyleSheet.create({
  swipeButton: {
    borderRadius: 3,
    marginRight: AUI_CONSTANTS.gridBaseDense
  },
  swipeButtonTrack: {
    paddingLeft: 8,
    backgroundColor: AUI_COLORS.getRgbaFromHex(AUI_COLORS.WalaTeal.shade3, 0.5)
  },
  favoriteButton: {
    marginRight: 0 - AUI_CONSTANTS.gridBase,
    paddingHorizontal: AUI_CONSTANTS.gridBase
  }
});

export {
  ConnectionUserItem
}