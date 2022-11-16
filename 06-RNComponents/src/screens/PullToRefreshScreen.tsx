/* eslint-disable react-native/no-inline-styles */
import {Dimensions, RefreshControl, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../navigartors/StackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import HeadScreen from '../components/HeadScreen';
import {useTheme} from '@react-navigation/native';

/**
 * El pull to refresh funciona en ScrollView & flatList
 *
 * RefreshControl: es un componente JSX que contiene un spiner
 * refreshing: booleano que muestra o esconde el componente
 * onRefresh: funcion que cambia a refreshing, y despues lo esconde.
 */
const wait = async (timeout: number) => {
  return await new Promise((res: any) => {
    setTimeout(res, timeout);
  });
};

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'PullToRefreshScreen'> {}
export default function PullToRefreshScreen({navigation}: Props) {
  const {colors} = useTheme();

  // estado de vista del pull to refresh
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  // evento que muestra el refresh control por un periodo pequeño
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => setRefreshing(false));
  }, []);

  const {width, height} = Dimensions.get('window');
  return (
    <ScrollView
      style={{
        position: 'absolute',
        flex: 1,
        height,
        width,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          // Android
          progressBackgroundColor="#5856d6"
          // progressViewOffset={50}
          colors={['white', 'red', 'green']}
          // IOS
          style={{
            paddingTop: 100,
            backgroundColor: '#5856d6',
            position: 'absolute',
          }}
          tintColor="tomato"
        />
      }>
      <View>
        <HeadScreen
          onPress={() => navigation.popToTop()}
          title="Pull to Refresh"
        />
        <Text style={{color: colors.text}}>PullToRefreshScreen</Text>
      </View>
    </ScrollView>
  );
}
