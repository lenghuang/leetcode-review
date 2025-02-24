import json
import questionary

def load_interview_data(filename="conversation.json"):
    with open(filename, "r") as f:
        return json.load(f)

def simulate_interview(data):
    current_node = "1"
    while current_node:
        node = data["interactions"][current_node]
        print(f"\nInterviewer: {node['a']}")

        if "b" in node:
            print(f"Candidate: {node['b']}")

        if "options" in node:
            choices = [option["text"] for option in node["options"]]
            selected_option = questionary.select(
                "Candidate:",
                choices=choices
            ).ask()

            next_node = next(
                (option["next"] for option in node["options"] if option["text"] == selected_option),
                None
            )

            if next_node is None:
                break
            current_node = next_node
        else:
            if "next" in node and node["next"] is not None:
                current_node = node["next"]
            else:
                break

    print("\nInterview Finished.")
    if "follow_up_questions" in data:
        print("\nFollow-up Questions:")
        for question in data["follow_up_questions"]:
            print(f"- {question}")

if __name__ == "__main__":
    data = load_interview_data()
    simulate_interview(data)
