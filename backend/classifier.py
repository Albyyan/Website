import os
import joblib

# load your trained pipeline
BASE_DIR   = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, 'svm_lyric_classifier.joblib')
clf        = joblib.load(MODEL_PATH)

# map scikit labels → names
label_map  = {0: 'Taylor', 1: 'Kanye'}

def classify_line(text: str) -> dict:
    """
    Returns percentage likelihoods for each artist.
    """
    proba = clf.predict_proba([text])[0]
    return { label_map[i]: round(p*100, 2) for i, p in enumerate(proba) }
