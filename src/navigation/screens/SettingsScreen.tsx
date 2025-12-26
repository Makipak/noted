import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Settings</Text>

        {/* Focus Mode Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Focus Mode</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="timer-outline" size={24} color={Colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Focus Duration</Text>
                <Text style={styles.settingValue}>60 seconds</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Notifications</Text>
                <Text style={styles.settingValue}>Enabled</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
          </View>
        </View>

        {/* Todo Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Todo Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="flag-outline" size={24} color={Colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Default Priority</Text>
                <Text style={styles.settingValue}>Normal</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Week Start</Text>
                <Text style={styles.settingValue}>Monday</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle-outline" size={24} color={Colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Version</Text>
                <Text style={styles.settingValue}>1.0.0</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Copyright Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Copyright</Text>
          
          <View style={styles.copyrightContainer}>
            <Text style={styles.copyrightPreview}>
              © {new Date().getFullYear()} Makipak. All rights reserved.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Pressable style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Help & Feedback</Text>
          </Pressable>

          <Pressable style={[styles.actionButton, styles.dangerButton]}>
            <Ionicons name="trash-outline" size={20} color="#f44336" />
            <Text style={[styles.actionButtonText, styles.dangerText]}>Clear All Data</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    marginTop: 8,
    color: Colors.textPrimary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  actionSection: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  dangerButton: {
    borderColor: '#f44336',
    backgroundColor: '#fff1f0',
  },
  dangerText: {
    color: '#f44336',
  },
  copyrightContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  copyrightLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  copyrightInput: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  copyrightPreview: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
