import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/global';

interface SignupScreenProps {
  onGoToLogin: () => void;
  onSubmit: () => void;
}

export default function SignupScreen({ onGoToLogin, onSubmit }: SignupScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Cadastre-se para organizar suas tarefas em um so lugar.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          autoCapitalize="words"
          autoComplete="name"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
        />

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={onSubmit}>
          <Text style={styles.primaryButtonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onGoToLogin} activeOpacity={0.7}>
        <Text style={styles.linkText}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  form: {
    width: '100%',
    gap: 14,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  primaryButton: {
    backgroundColor: globalStyles.primaryColor,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: globalStyles.primaryColor,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
