const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const koreanQuestions = require('../data/korean_organization_culture_survey.json');
const englishQuestions = require('../data/english_organization_culture_survey.json');

const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      '../config/outio-9027f-firebase-adminsdk-pgqgn-5c118b6143.json'
    ),
    'utf8'
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadSurveyTemplates() {
  try {
    await db
      .collection('surveyTemplates')
      .doc('koreanOrganizationCultureSurvey')
      .set({
        name: '한국어 조직 문화 설문',
        questions: koreanQuestions,
      });

    await db
      .collection('surveyTemplates')
      .doc('englishOrganizationCultureSurvey')
      .set({
        name: 'English Organization Culture Survey',
        questions: englishQuestions,
      });

    console.log('Survey templates uploaded successfully');
  } catch (error) {
    console.error('Error uploading survey templates:', error);
  }
}

uploadSurveyTemplates();
