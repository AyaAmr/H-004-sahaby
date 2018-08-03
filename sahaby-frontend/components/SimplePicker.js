
/* Original code from react-native-simple-picker
https://github.com/puredazzle/react-native-simple-picker
code imported to override background color and to take options as an array of objects */
import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  PickerIOS,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const PickerItemIOS = PickerIOS.Item;

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  overlayContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
  },

  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#FFF',
  },

  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  bottomPicker: {
    width: SCREEN_WIDTH,
  },
});

const propTypes = {
  buttonColor: PropTypes.string,
  buttonStyle: PropTypes.object,
  options: PropTypes.array.isRequired,
  initialOptionIndex: PropTypes.number,
  labels: PropTypes.array,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  itemStyle: PropTypes.object,
  onSubmit: PropTypes.func,
  disableOverlay: PropTypes.bool,
  getLabelName: PropTypes.func,
};

class SimplePicker extends Component {
  constructor(props) {
    super(props);
    const selected = this.props.initialOptionIndex || 0;
    this.state = {
      modalVisible: false,
      selectedOption: this.props.options[selected].value,
      selectedLabelName: this.props.options[selected].name,
    };

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onOverlayDismiss = this.onOverlayDismiss.bind(this);

    if ('buttonColor' in props) {
      console.warn('buttonColor as a prop is deprecated, please use buttonStyle instead.');
    }
  }
  onPressCancel() {
    this.hide();
  }

  onPressSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selectedOption);
    }
    this.hide();
  }

  onOverlayDismiss() {
    this.onPressSubmit();
    this.hide();
  }

  onValueChange(option, index) {
    this.setState({
      selectedOption: option,
      selectedLabelName: this.props.options[index].name,
    }, () => {
      // this.props.getSelectedValue(this.props.options[index].value);
    });
  }

  show() {
    this.setState({
      modalVisible: true,
    });
  }

  hide() {
    this.setState({
      modalVisible: false,
    });
  }

  renderItem(option, index) {
    const label = (this.props.labels) ? this.props.labels[index] : option;
    return (
      <PickerItemIOS
        key={option.value}
        value={option.value}
        label={option.label}
      />
    );
  }

  render() {
    const { modalVisible, selectedOption } = this.state;
    const {
      options,
      buttonStyle,
      itemStyle,
      cancelText,
      confirmText,
      disableOverlay,
    } = this.props;

    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={modalVisible}
      >
        <View style={styles.basicContainer}>
          {!disableOverlay &&
            <View style={styles.overlayContainer}>
              <TouchableWithoutFeedback onPress={this.onOverlayDismiss}>
                <View style={styles.overlayContainer} />
              </TouchableWithoutFeedback>
            </View>
          }
          <View style={styles.modalContainer}>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={ () => this.onPressSubmit()}>
                <Text style={buttonStyle}>
                  {confirmText || 'Confirm'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={buttonStyle}>
                  {cancelText || 'Cancel'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainBox}>
              <PickerIOS
                ref={'picker'}
                style={styles.bottomPicker}
                selectedValue={selectedOption}
                onValueChange={(option, index) => this.onValueChange(option, index)}
                itemStyle={itemStyle}
              >
                {options.map((option, index) => this.renderItem(option, index))}
              </PickerIOS>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

SimplePicker.propTypes = propTypes;

export default SimplePicker;
