import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

class HeaderC extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}
export { HeaderC };