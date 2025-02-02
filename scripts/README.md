# Question Generation

Directory containing python code that I ran to generate AI based questions

# Developer notes

To save a `requirements.txt` file

```bash
python -m pipreqs.pipreqs --force .
```

To run pre-commit hook

```bash
pre-commit run --all-files
```

Make new virtual environment

```bash
python3 -m venv venv
```

Activate virtual environment

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Set up BAML prompts

```bash
baml-cli generate
```
