import sys
import time
import random
import warnings

from datetime import datetime

from crew import DynamicCrew
from dotenv import load_dotenv

load_dotenv()

warnings.filterwarnings(
    "ignore",
    category=SyntaxWarning,
    module="pysbd"
)

MAX_RETRIES = 5

RETRYABLE_ERRORS = (
    "429",
    "503",
    "504",
    "RESOURCE_EXHAUSTED",
    "UNAVAILABLE",
    "DEADLINE_EXCEEDED"
)


def should_retry(error: Exception) -> bool:
    error_text = str(error).upper()

    return any(
        code in error_text
        for code in RETRYABLE_ERRORS
    )


def calculate_delay(attempt: int) -> float:
    """
    Exponential backoff + jitter

    1 -> ~2-3 sec
    2 -> ~4-5 sec
    3 -> ~8-9 sec
    4 -> ~16-17 sec
    5 -> ~32-33 sec
    """

    base_delay = 2 ** attempt
    jitter = random.uniform(0, 1)

    return min(base_delay + jitter, 60)


def execute_with_retry(func, *args, **kwargs):

    last_error = None

    for attempt in range(MAX_RETRIES):

        try:
            return func(*args, **kwargs)

        except Exception as e:

            last_error = e

            if not should_retry(e):
                raise

            if attempt == MAX_RETRIES - 1:
                break

            delay = calculate_delay(attempt + 1)

            print(
                f"\nRetryable error detected:\n"
                f"{e}\n"
                f"Retry {attempt + 1}/{MAX_RETRIES}"
                f" after {delay:.1f}s\n"
            )

            time.sleep(delay)

    raise Exception(
        f"Failed after {MAX_RETRIES} retries.\n"
        f"Last error: {last_error}"
    )


def run():
    """
    Run the crew.
    """

    inputs = {
        "topic": "AI LLMs",
        "current_year": str(datetime.now().year)
    }
    crew = DynamicCrew("config/request.json").build()
    result = execute_with_retry(
        crew.kickoff,
        inputs=inputs
    )
    print(result)


def train():

    inputs = {
        "topic": "AI LLMs",
        "current_year": str(datetime.now().year)
    }

    execute_with_retry(
        Literal().crew().train,
        n_iterations=int(sys.argv[1]),
        filename=sys.argv[2],
        inputs=inputs
    )


def replay():

    execute_with_retry(
        Literal().crew().replay,
        task_id=sys.argv[1]
    )


def test():

    inputs = {
        "topic": "AI LLMs",
        "current_year": str(datetime.now().year)
    }

    execute_with_retry(
        Literal().crew().test,
        n_iterations=int(sys.argv[1]),
        eval_llm=sys.argv[2],
        inputs=inputs
    )


def run_with_trigger():

    import json

    if len(sys.argv) < 2:
        raise Exception(
            "No trigger payload provided"
        )

    payload = json.loads(sys.argv[1])

    inputs = {
        "crewai_trigger_payload": payload,
        "topic": "",
        "current_year": ""
    }

    return execute_with_retry(
        Literal().crew().kickoff,
        inputs=inputs
    )


if __name__ == "__main__":
    run()