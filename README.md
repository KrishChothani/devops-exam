# Automated CloudOps CI/CD Deployment: GitHub → AWS CodeCommit → AWS CodePipeline → Amazon S3

Automated continuous delivery pipeline integrating **GitHub**, **AWS CodeCommit**, **AWS CodePipeline**, and **Amazon S3** static cloud hosting.

---

## 🌟 Architecture Overview

```
 [Developer] ──Push──> [ GitHub Repository ]
                              │
                    (GitHub Actions Sync)
                              ▼
                     [ AWS CodeCommit ]
                     (devops-exam-repo)
                              │
                    (Source Trigger / Poll)
                              ▼
                    [ AWS CodePipeline ]
                   (devops-exam-pipeline)
                              │
                    (Deploy & Extract)
                              ▼
                     [ Amazon S3 Bucket ]
               (devops-exam-site-956420554301)
                              │
                     (Live Static Website)
```

---

## 📁 Repository Structure

```
.
├── .github/
│   └── workflows/
│       └── sync-codecommit.yml    # Automated GitHub to AWS CodeCommit synchronization
├── .gitignore                     # Safeguards secrets & AWS credentials
├── index.html                     # Responsive, accessible cloud dashboard UI
├── style.css                      # Modern CSS design system (Glassmorphism & animations)
├── script.js                      # Interactive pipeline simulator & terminal CLI
└── README.md                      # Complete system documentation
```

---

## ⚙️ AWS Configuration Details

| Component | AWS Resource Name | Details / ARN |
| :--- | :--- | :--- |
| **AWS Region** | `us-east-1` | US East (N. Virginia) |
| **CodeCommit Repo** | `devops-exam-repo` | `arn:aws:codecommit:us-east-1:956420554301:devops-exam-repo` |
| **CodePipeline** | `devops-exam-pipeline` | Orchestrates Source & Deploy stages |
| **IAM Service Role** | `PipelineRole` | `arn:aws:iam::956420554301:role/PipelineRole` |
| **Target S3 Bucket** | `devops-exam-site-956420554301` | Live website extraction target |
| **Artifact Bucket** | `devops-exam-artifacts-956420554301` | Pipeline artifact storage |
| **GitHub Repo** | `devops-exam` | `https://github.com/KrishChothani/devops-exam` |

---

## 🚀 How Automation Works

1. **Commit & Push**: A developer pushes code changes to the GitHub `main` branch.
2. **CodeCommit Mirroring**: Git push directly or via GitHub Actions synchronizes commits to `devops-exam-repo`.
3. **Pipeline Trigger**: AWS CodePipeline automatically polls/detects new commits in CodeCommit.
4. **S3 Deploy Action**: CodePipeline bundles the source artifact, extracts it directly into `devops-exam-site-956420554301`.
5. **Live Delivery**: Static assets are instantly live and accessible.

---

## 👨‍💻 Author

**Krish Chothani**  
[GitHub Profile](https://github.com/KrishChothani)
