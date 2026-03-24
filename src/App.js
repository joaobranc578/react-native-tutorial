import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import CardUser from './components/CardUser';
import { useEffect } from 'react';

export default function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('http://localhost:3333/user');
      const data = await response.json();
      if (response.ok) {
        console.log(data.users);
        setUsers(data.users);
      } else {
        console.error("Erro ao buscar usuários:", data);
      }
    }
    getUsers();
}, [])

  return (
      <View style={styles.container}>
        <Header />


        {users.map(user => (
        <CardUser 
          key={user.id}
          avatar={user.avatar}
          name={user.name}
          email={user.email}
        />
        ))}
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    //justifyContent: 'center',
  }
});
