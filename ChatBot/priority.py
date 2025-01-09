from textblob import TextBlob
import pandas as pd

# Adjust analyze_complaint to set dynamic impact and type_value
def analyze_complaint(description):
    blob = TextBlob(description)
    polarity = blob.sentiment.polarity

    # Determine urgency based on sentiment polarity
    if polarity <= -0.6:
        urgency = 3  # High urgency
    elif -0.6 < polarity <= -0.2:
        urgency = 2  # Medium urgency
    else:
        urgency = 1  # Low urgency

    # Set dynamic impact based on keywords or length
    impact = 1  # Default impact
    if any(keyword in description.lower() for keyword in ["urgent", "critical", "important"]):
        impact = 3  # High impact if certain keywords are present
    elif len(description.split()) > 15:
        impact = 2  # Medium impact for longer complaints

    # Set type_value based on complaint category or severity
    type_value = 1  # Default type value
    if "health" in description.lower():
        type_value = 3  # High type value for health-related issues
    elif "safety" in description.lower():
        type_value = 2  # Moderate type value for safety-related issues

    return urgency, impact, type_value


# Calculate priority
def calculate_priority(urgency, impact, type_value):
    return urgency * 0.5 + impact * 0.3 + type_value * 0.2

# Input complaint description
def input_complaint(description):
    urgency, impact, type_value = analyze_complaint(description)
    priority_score = calculate_priority(urgency, impact, type_value)

    complaint = {
        'urgency': urgency,
        'impact': impact,
        'type': type_value,
        'description': description,
        'priority_score': priority_score
    }
    
    return complaint