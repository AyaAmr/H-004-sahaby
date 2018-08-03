
import React, { Component } from 'react';
import { View, Platform, Picker, TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import SimplePicker from './SimplePicker';

class NativePicker extends Component {

  componentWillMount() {
    this.setState({
      selected: this.props.options[0],
    });
    this.props.selectedValue(this.props.options[0]);
  }
  showPicker = () => {
    this.picker.show();
  }
  setSelectedValue = (option) => {
    const selectedValue = this.props.options.filter(item => item.value === option);
    // this.setState({ selected: this.props.options[option] }); //TODO should be edited
    this.setState({ selected: selectedValue[0] });
    this.props.selectedValue(selectedValue[0]);
  }

  render() {
    const { pickerStyle, options, pickerTextStyle, arrow, custom } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          onPress={this.showPicker}
          style={{
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#F1F1F1',
            padding: 10,
            borderRadius: 8 }}>
          <View
            style={[{ flexDirection: 'row', alignItems: 'center' }, pickerStyle]}
          >
            <Text
              style={pickerTextStyle}>
              {this.state.selected.label}
            </Text>
            <SimplePicker
              itemStyle={{ fontFamily: 'arimo-italic' }}
              buttonStyle={{ width: '100%' }}
              options={options}
              ref={(el) => { this.picker = el; }}
              cancelText={'Cancel'}
              confirmText={'Confirm'}
              onSubmit={ (option) => { this.setSelectedValue(option); } }
            />
            <Image
              style={{ width: 8, height: 6, marginHorizontal: 10 }}
              source = {require('../assets/images/down.png')}/>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={
        custom ? {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      } : {}} >
        <Picker
          mode={'dialog'}
          style={[pickerTextStyle, custom ? {
            fontSize: 12,
            flex: 1,
            backgroundColor: colors.primaryColor,
          } : {}]}
          selectedValue={this.state.selected.value}
          onValueChange={(itemValue) => {
            this.setSelectedValue(itemValue);
          }}>
          {options.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.label}
                value={item.value}
              />);
          })}
        </Picker>
        { custom &&
          <Image
            style={{ width: 9, height: 6, marginHorizontal: 10 }}
            source = {arrow}/>
        }
        { !custom &&
          <View style={{ height: 1, width: '100%', backgroundColor: colors.borderColor }}></View>
        }
      </View>
    );
  }
}
export { NativePicker };


NativePicker.propTypes = {
  pickerStyle: PropTypes.number,
  pickerTextStyle: PropTypes.number,
  defaultName: PropTypes.string,
  options: PropTypes.array,
  selectedValue: PropTypes.func,
  getLabel: PropTypes.func,
};

