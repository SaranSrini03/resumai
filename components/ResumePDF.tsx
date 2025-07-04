'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: { marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold' },
  title: { fontSize: 14, marginBottom: 4 },
  contact: { fontSize: 10, color: 'gray', marginBottom: 10 },
  heading: { fontSize: 14, marginTop: 10, marginBottom: 4, fontWeight: 'bold' },
  bullet: { marginLeft: 10 },
});

export default function ResumePDF({ name, title, email, linkedin, location, phone, summary, experience, skills, education }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.contact}>
          {email} | {linkedin} | {location} | {phone}
        </Text>

        <View style={styles.section}>
          <Text>{summary}</Text>
        </View>

        <Text style={styles.heading}>Work Experience</Text>
        {experience.map((exp: any, i: number) => (
          <View key={i} style={styles.section}>
            <Text>
              {exp.role} | {exp.company} | {exp.location} ({exp.start} - {exp.end})
            </Text>
            {exp.bullets.map((point: string, j: number) => (
              <Text key={j} style={styles.bullet}>• {point}</Text>
            ))}
          </View>
        ))}

        <Text style={styles.heading}>Core Skills</Text>
        <Text>{skills.join(', ')}</Text>

        <Text style={styles.heading}>Education</Text>
        <Text>{education.school} — {education.degree} ({education.date})</Text>
      </Page>
    </Document>
  );
}
