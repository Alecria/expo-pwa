import { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { mockContacts, type Contact } from "../data/mockContacts";

type Screen = "form" | "list";

const emptyForm = { nome: "", email: "" };

export default function HomeScreen() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [screen, setScreen] = useState<Screen>("form");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<{ nome?: string; email?: string }>({});

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return contacts;
    return contacts.filter(
      (contact) =>
        contact.nome.toLocaleLowerCase().includes(query) ||
        contact.email.toLocaleLowerCase().includes(query),
    );
  }, [contacts, search]);

  function resetForm() {
    setNome(emptyForm.nome);
    setEmail(emptyForm.email);
    setEditingId(null);
    setErrors({});
  }

  function openNewContact() {
    resetForm();
    setFeedback("");
    setScreen("form");
  }

  function editContact(contact: Contact) {
    setNome(contact.nome);
    setEmail(contact.email);
    setEditingId(contact.id);
    setErrors({});
    setFeedback("");
    setScreen("form");
  }

  function saveContact() {
    const nextErrors: { nome?: string; email?: string } = {};
    const cleanName = nome.trim();
    const cleanEmail = email.trim();

    if (!cleanName) nextErrors.nome = "Informe o nome.";
    if (!cleanEmail) {
      nextErrors.email = "Informe o e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      nextErrors.email = "Digite um e-mail válido.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFeedback("Confira os campos destacados.");
      return;
    }

    if (editingId) {
      setContacts((items) =>
        items.map((item) =>
          item.id === editingId ? { ...item, nome: cleanName, email: cleanEmail } : item,
        ),
      );
      setFeedback("Contato atualizado nos dados simulados.");
    } else {
      const newContact: Contact = {
        id: `mock-${Date.now()}`,
        nome: cleanName,
        email: cleanEmail,
        createdAt: new Date().toISOString(),
      };
      setContacts((items) => [newContact, ...items]);
      setFeedback("Contato adicionado aos dados simulados.");
    }

    resetForm();
    setScreen("list");
  }

  function removeContact(id: string) {
    setContacts((items) => items.filter((item) => item.id !== id));
    setFeedback("Contato removido dos dados simulados.");
  }

  return (
    <View style={styles.app}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topbar}>
        <View style={styles.topbarInner}>
          <View style={styles.brand}>
            <View style={styles.brandMark}><Text style={styles.brandMarkText}>A</Text></View>
            <View>
              <Text style={styles.brandName}>Alecria</Text>
              <Text style={styles.brandCaption}>GESTÃO DE CONTATOS</Text>
            </View>
          </View>
          <View style={styles.stagePill}>
            <View style={styles.stageDot} />
            <Text style={styles.stageText}>Ambiente de demonstração</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.page}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>ETAPA 3 · INTERFACE</Text>
          <Text accessibilityRole="header" style={styles.pageTitle}>
            Contatos, sem complicação.
          </Text>
          <Text style={styles.pageDescription}>
            Cadastre e organize contatos em uma interface simples, preparada para conectar ao banco de dados na próxima etapa.
          </Text>
        </View>

        <View style={styles.tabs}>
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: screen === "form" }}
            onPress={openNewContact}
            style={[styles.tab, screen === "form" && styles.tabActive]}
          >
            <Text style={[styles.tabText, screen === "form" && styles.tabTextActive]}>
              {editingId ? "Editar contato" : "Novo contato"}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: screen === "list" }}
            onPress={() => { setScreen("list"); setFeedback(""); }}
            style={[styles.tab, screen === "list" && styles.tabActive]}
          >
            <Text style={[styles.tabText, screen === "list" && styles.tabTextActive]}>
              Contatos <Text style={[styles.tabCount, screen === "list" && styles.tabTextActive]}>{contacts.length}</Text>
            </Text>
          </Pressable>
        </View>

        {feedback ? (
          <View style={[styles.feedback, feedback.includes("Confira") && styles.feedbackError]}>
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>
        ) : null}

        {screen === "form" ? (
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View style={styles.panelIcon}><Text style={styles.panelIconText}>{editingId ? "✎" : "+"}</Text></View>
              <View style={styles.panelHeaderCopy}>
                <Text style={styles.panelTitle}>{editingId ? "Editar contato" : "Adicionar contato"}</Text>
                <Text style={styles.panelSubtitle}>
                  {editingId ? "Atualize os dados abaixo." : "Preencha os dados para incluir um novo registro."}
                </Text>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Nome completo <Text style={styles.required}>*</Text></Text>
              <TextInput
                accessibilityLabel="Nome completo"
                value={nome}
                onChangeText={(value) => { setNome(value); setErrors((old) => ({ ...old, nome: undefined })); }}
                placeholder="Ex.: Ana Silva"
                placeholderTextColor="#9aa5b7"
                autoCapitalize="words"
                autoComplete="name"
                returnKeyType="next"
                style={[styles.input, errors.nome && styles.inputError]}
              />
              {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>E-mail <Text style={styles.required}>*</Text></Text>
              <TextInput
                accessibilityLabel="E-mail"
                value={email}
                onChangeText={(value) => { setEmail(value); setErrors((old) => ({ ...old, email: undefined })); }}
                placeholder="ana@exemplo.com"
                placeholderTextColor="#9aa5b7"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                returnKeyType="done"
                onSubmitEditing={saveContact}
                style={[styles.input, errors.email && styles.inputError]}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.formActions}>
              <Pressable accessibilityRole="button" onPress={saveContact} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                <Text style={styles.primaryButtonText}>{editingId ? "Salvar alterações" : "Adicionar contato"}</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </Pressable>
              {editingId ? (
                <Pressable accessibilityRole="button" onPress={openNewContact} style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Cancelar edição</Text>
                </Pressable>
              ) : null}
            </View>
            <Text style={styles.formHint}><Text style={styles.required}>*</Text> Campos obrigatórios</Text>
          </View>
        ) : (
          <View style={styles.panel}>
            <View style={styles.listHeader}>
              <View>
                <Text style={styles.panelTitle}>Seus contatos</Text>
                <Text style={styles.panelSubtitle}>Consulte e gerencie os registros de demonstração.</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={openNewContact} style={styles.smallPrimaryButton}>
                <Text style={styles.smallPrimaryButtonText}>＋ Novo</Text>
              </Pressable>
            </View>

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                accessibilityLabel="Buscar contatos"
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar por nome ou e-mail"
                placeholderTextColor="#9aa5b7"
                style={styles.searchInput}
                autoCapitalize="none"
              />
              {search ? <Pressable onPress={() => setSearch("")}><Text style={styles.clearSearch}>Limpar</Text></Pressable> : null}
            </View>

            {filteredContacts.length ? (
              <View style={styles.contactList}>
                {filteredContacts.map((contact, index) => (
                  <View key={contact.id} style={[styles.contactRow, index === filteredContacts.length - 1 && styles.contactRowLast]}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{contact.nome.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase()}</Text>
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{contact.nome}</Text>
                      <Text style={styles.contactEmail}>{contact.email}</Text>
                    </View>
                    <View style={styles.contactActions}>
                      <Pressable accessibilityRole="button" accessibilityLabel={`Editar ${contact.nome}`} onPress={() => editContact(contact)} style={styles.iconButton}>
                        <Text style={styles.actionIcon}>✎</Text>
                      </Pressable>
                      <Pressable accessibilityRole="button" accessibilityLabel={`Excluir ${contact.nome}`} onPress={() => removeContact(contact.id)} style={styles.iconButton}>
                        <Text style={styles.deleteIcon}>×</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>⌕</Text>
                <Text style={styles.emptyTitle}>Nenhum contato encontrado</Text>
                <Text style={styles.emptyDescription}>Tente outra busca ou adicione um novo contato.</Text>
              </View>
            )}
            <Text style={styles.listFootnote}>Exibindo dados simulados desta sessão. Eles não são salvos no servidor.</Text>
          </View>
        )}

        <View style={styles.demoNotice}>
          <View style={styles.demoNoticeIcon}><Text style={styles.demoNoticeIconText}>i</Text></View>
          <View style={styles.demoNoticeCopy}>
            <Text style={styles.demoNoticeTitle}>Modo de demonstração</Text>
            <Text style={styles.demoNoticeText}>
              As alterações ficam apenas na memória desta página. O Firebase e a persistência real serão configurados em etapas posteriores.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>ALECRIA · EXPO PWA</Text>
          <Text style={styles.footerText}>{Platform.OS === "web" ? "Experiência web responsiva" : "Experiência multiplataforma"}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, minHeight: "100%", backgroundColor: "#f5f7fb" },
  topbar: { backgroundColor: "#ffffff", borderBottomWidth: 1, borderBottomColor: "#e8ecf3" },
  topbarInner: { width: "100%", maxWidth: 1080, alignSelf: "center", minHeight: 76, paddingHorizontal: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  brand: { flexDirection: "row", alignItems: "center", gap: 12 },
  brandMark: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#243b75", alignItems: "center", justifyContent: "center" },
  brandMarkText: { color: "#ffffff", fontSize: 22, fontWeight: "800" },
  brandName: { color: "#17233d", fontSize: 18, fontWeight: "800", letterSpacing: -0.3 },
  brandCaption: { color: "#8792a5", fontSize: 9, fontWeight: "800", letterSpacing: 1.3, marginTop: 3 },
  stagePill: { flexDirection: "row", alignItems: "center", gap: 7, backgroundColor: "#f0f3f9", borderRadius: 99, paddingHorizontal: 12, paddingVertical: 8 },
  stageDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#d39b35" },
  stageText: { color: "#5e6a80", fontSize: 11, fontWeight: "600" },
  scroll: { flex: 1 },
  page: { width: "100%", maxWidth: 820, alignSelf: "center", paddingHorizontal: 24, paddingTop: 42, paddingBottom: 28 },
  intro: { marginBottom: 28 },
  eyebrow: { color: "#5069a7", fontSize: 11, fontWeight: "800", letterSpacing: 1.7, marginBottom: 10 },
  pageTitle: { color: "#17233d", fontSize: 32, lineHeight: 39, fontWeight: "800", letterSpacing: -0.8, marginBottom: 10 },
  pageDescription: { color: "#68758b", fontSize: 15, lineHeight: 23, maxWidth: 610 },
  tabs: { flexDirection: "row", gap: 8, borderBottomWidth: 1, borderBottomColor: "#e0e6f0", marginBottom: 20 },
  tab: { flexDirection: "row", alignItems: "center", paddingHorizontal: 17, paddingVertical: 13, borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabActive: { borderBottomColor: "#3455a4" },
  tabText: { color: "#7a869a", fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#294783" },
  tabCount: { color: "#7a869a", fontSize: 11, fontWeight: "800" },
  feedback: { backgroundColor: "#eaf7ef", borderColor: "#c9e9d4", borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11, marginBottom: 16 },
  feedbackError: { backgroundColor: "#fff3f0", borderColor: "#f4d1ca" },
  feedbackText: { color: "#315f43", fontSize: 13, lineHeight: 19 },
  panel: { backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#e4e9f2", borderRadius: 18, padding: 26, shadowColor: "#17233d", shadowOpacity: 0.035, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 1 },
  panelHeader: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 26 },
  panelIcon: { width: 44, height: 44, borderRadius: 13, backgroundColor: "#eef2ff", alignItems: "center", justifyContent: "center" },
  panelIconText: { color: "#3455a4", fontSize: 24, fontWeight: "500" },
  panelHeaderCopy: { flex: 1 },
  panelTitle: { color: "#17233d", fontSize: 18, fontWeight: "800", letterSpacing: -0.3 },
  panelSubtitle: { color: "#7a869a", fontSize: 12, lineHeight: 18, marginTop: 4 },
  field: { marginBottom: 20 },
  label: { color: "#34415a", fontSize: 12, fontWeight: "700", marginBottom: 8 },
  required: { color: "#c45c52" },
  input: { width: "100%", borderWidth: 1, borderColor: "#dce3ee", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 13, color: "#17233d", backgroundColor: "#ffffff", fontSize: 14, outlineStyle: "none" } as any,
  inputError: { borderColor: "#c45c52", backgroundColor: "#fffafa" },
  errorText: { color: "#b54d43", fontSize: 12, marginTop: 6 },
  formActions: { flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 3 },
  primaryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 18, backgroundColor: "#294783", borderRadius: 10, paddingHorizontal: 18, paddingVertical: 14, minHeight: 48 },
  primaryButtonText: { color: "#ffffff", fontSize: 13, fontWeight: "800" },
  buttonArrow: { color: "#ffffff", fontSize: 17, marginTop: -1 },
  buttonPressed: { opacity: 0.82 },
  secondaryButton: { paddingHorizontal: 14, paddingVertical: 13 },
  secondaryButtonText: { color: "#66738a", fontSize: 13, fontWeight: "700" },
  formHint: { color: "#8a95a7", fontSize: 11, marginTop: 17 },
  listHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 22 },
  smallPrimaryButton: { backgroundColor: "#294783", borderRadius: 9, paddingHorizontal: 13, paddingVertical: 10 },
  smallPrimaryButtonText: { color: "#ffffff", fontSize: 12, fontWeight: "800" },
  searchBox: { flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 1, borderColor: "#dce3ee", borderRadius: 10, paddingHorizontal: 12, marginBottom: 12, minHeight: 46 },
  searchIcon: { color: "#8792a5", fontSize: 22 },
  searchInput: { flex: 1, color: "#17233d", fontSize: 13, paddingVertical: 11, outlineStyle: "none" } as any,
  clearSearch: { color: "#3455a4", fontSize: 11, fontWeight: "700", paddingVertical: 8 },
  contactList: { borderTopWidth: 1, borderTopColor: "#edf0f6" },
  contactRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#edf0f6" },
  contactRowLast: { borderBottomWidth: 0 },
  avatar: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#e9eefb", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#3455a4", fontSize: 12, fontWeight: "800" },
  contactInfo: { flex: 1, minWidth: 0 },
  contactName: { color: "#26334d", fontSize: 13, fontWeight: "800", marginBottom: 5 },
  contactEmail: { color: "#7a869a", fontSize: 12 },
  contactActions: { flexDirection: "row", alignItems: "center", gap: 5 },
  iconButton: { width: 34, height: 34, borderRadius: 9, alignItems: "center", justifyContent: "center", backgroundColor: "#f4f6fa" },
  actionIcon: { color: "#53678f", fontSize: 17 },
  deleteIcon: { color: "#b75d57", fontSize: 23, lineHeight: 25 },
  emptyState: { alignItems: "center", paddingVertical: 35, paddingHorizontal: 15 },
  emptyIcon: { color: "#9aa5b7", fontSize: 30, marginBottom: 8 },
  emptyTitle: { color: "#34415a", fontSize: 14, fontWeight: "800", marginBottom: 6 },
  emptyDescription: { color: "#7a869a", fontSize: 12, textAlign: "center", lineHeight: 19 },
  listFootnote: { color: "#9aa5b7", fontSize: 11, lineHeight: 17, marginTop: 17 },
  demoNotice: { flexDirection: "row", gap: 12, backgroundColor: "#eef3ff", borderWidth: 1, borderColor: "#dce6ff", borderRadius: 12, padding: 16, marginTop: 18 },
  demoNoticeIcon: { width: 22, height: 22, borderRadius: 11, backgroundColor: "#d8e3ff", alignItems: "center", justifyContent: "center", marginTop: 1 },
  demoNoticeIconText: { color: "#3455a4", fontSize: 13, fontWeight: "800" },
  demoNoticeCopy: { flex: 1 },
  demoNoticeTitle: { color: "#294783", fontSize: 12, fontWeight: "800", marginBottom: 5 },
  demoNoticeText: { color: "#52678f", fontSize: 12, lineHeight: 19 },
  footer: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginTop: 28 },
  footerText: { color: "#9aa5b7", fontSize: 10, fontWeight: "700", letterSpacing: 0.7 },
});

