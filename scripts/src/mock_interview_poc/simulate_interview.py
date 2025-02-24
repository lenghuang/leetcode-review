import json

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
            print("\nCandidate Response Options:")
            for i, option in enumerate(node["options"]):
                print(f"{i + 1}. {option['text']}")

            choice = input("Enter your choice (1, 2, ...): ")
            try:
                choice_index = int(choice) - 1
                next_node = node["options"][choice_index]["next"]
                if next_node is None:
                    break
                current_node = next_node
            except (ValueError, IndexError):
                print("Invalid choice. Please try again.")
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