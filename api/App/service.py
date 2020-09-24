from App.ext import db
from App.models import ModelResponse


def calculate_accuracy():
    current_count = db.session.query(ModelResponse).filter(
        ModelResponse.expected_response == ModelResponse.recorded_response).count()
    total_count = db.session.query(ModelResponse).count()
    return current_count/total_count
