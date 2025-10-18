# GitHub Activity Tracker CLI 🚀

A lightweight command-line interface (CLI) tool to fetch and display recent **public GitHub activity** for any user. Pulls events like pushes, stars, issues, and more directly from the GitHub API, with colorful output for easy reading. Perfect for quick checks on developer activity! 🌟

---

## 🌟 Features

- 🔍 Fetch recent public events (up to 15) for a GitHub username
- 📊 Support for common event types: Pushes, Stars, Creates, Issues, Pull Requests, Forks, and more
- 🎨 Color-coded console output using Chalk for better visualization
- ❌ Graceful error handling for invalid users or network issues
- 📱 No authentication required – uses public API endpoints

---

## 🛠️ Installation

1. Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) installed.
2. Clone or download this repository:
   ```bash
   git clone <repository-url>
   ```
3. Navigate to the project directory:
   ```bash
   cd github-activity-tracker
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run the CLI using:
   ```bash
   node index.js
   ```

---

## 🚀 Usage

Run the CLI with `node index.js` followed by a GitHub username. It fetches and displays the user's recent public activity.

### 📚 Available Commands

| Command | Description |
|---------|-------------|
| `node index.js <username>` | Fetch and display recent public GitHub activity for the specified username (e.g., `node index.js octocat`) |

### Example Usage

```bash
$ node index.js octocat
Fetching activity for octocat...
Recent activity for octocat:

- Pushed 3 commits to octocat/Hello-World
- Starred octocat/Hello-World
- Created branch main in octocat/Hello-World
- Opened in octocat/Hello-World
- Forked octocat/Hello-World to octocat/Spoon-Knife
- Did a PushEvent on octocat/Hello-World
```

If the user doesn't exist:
```bash
$ node index.js non-existent-user
Fetching activity for non-existent-user...
Error: User not found: non-existent-user
```