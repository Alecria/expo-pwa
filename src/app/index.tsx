import { Platform, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <View style={styles.mark}>
          <Text style={styles.markText}>A</Text>
        </View>
        <Text style={styles.eyebrow}>ALECRIA · EXPO WEB</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Sua base para a experiência web
        </Text>
        <Text style={styles.description}>
          A estrutura inicial do aplicativo está pronta para evoluir. Nesta etapa,
          configuramos a base web e os recursos de instalação PWA.
        </Text>
        <View style={styles.status}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>Base PWA em configuração</Text>
        </View>
        <Text style={styles.note}>
          Nenhum formulário, CRUD ou serviço Firebase foi implementado nesta etapa.
        </Text>
        {Platform.OS === "web" ? (
          <Text style={styles.platform}>Executando na versão web</Text>
        ) : null}
      </View>
      <Text style={styles.footer}>Alecria · Projeto Expo PWA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#f4f6fb",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  card: {
    width: "100%",
    maxWidth: 680,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "#e3e8f2",
    shadowColor: "#1d2b4f",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  mark: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#243b75",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  markText: { color: "#ffffff", fontSize: 24, fontWeight: "800" },
  eyebrow: {
    color: "#5069a7",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginBottom: 12,
  },
  title: {
    color: "#17233d",
    fontSize: 34,
    lineHeight: 41,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginBottom: 16,
  },
  description: {
    color: "#526078",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 24,
  },
  status: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef3ff",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 99,
    marginBottom: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4567c5",
    marginRight: 9,
  },
  statusText: { color: "#294783", fontSize: 13, fontWeight: "700" },
  note: { color: "#68758b", fontSize: 13, lineHeight: 20 },
  platform: { color: "#8792a5", fontSize: 12, marginTop: 18 },
  footer: { color: "#8792a5", fontSize: 12, marginTop: 24 },
});