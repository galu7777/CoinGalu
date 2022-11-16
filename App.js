import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import CoinItems from './src/components/CoinItems';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async() => {
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await resp.json()
    setCoins(data)
  }

  useEffect(() => {
    loadData()
  }, [])
  

  return (
    <View style={ styles.container }>
      <StatusBar backgroundColor="#141414"/>
      <View style={ styles.haeder }>
        <Text style={ styles.title }>GaluMarkert</Text>
        <TextInput style={ styles.searchInput }
          placeholder="Search a Coin"
          placeholderTextColor="#858585"
          onChangeText={ text => setSearch(text)}
        />
      </View>
      <FlatList
        style={ styles.list }
        data={
          coins.filter( (coin) => coin.name.toLowerCase().includes(search) 
          || coin.symbol.toLowerCase().includes(search) )
        }
        renderItem={ ({item}) => {
          //console.log(item.name)
          return <CoinItems coin={item}/>
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={ async() => {
          setRefreshing(true)
          await loadData()
          setRefreshing(false)
        }}
      />

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: 'center',

  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20
  },
  list: {
    width: '90%'
  }, 
  haeder: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    width: '90%'
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4557CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center'
  }     
})

export default App;



