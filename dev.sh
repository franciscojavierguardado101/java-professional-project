#!/bin/bash
# Start Spring Boot and Next.js together.
# Run from the project root: ./dev.sh

export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Starting Spring Boot on :8080..."
cd "$REPO_ROOT/spring-boot-api" && ./mvnw spring-boot:run &
SPRING_PID=$!

echo "Starting Next.js on :3000..."
cd "$REPO_ROOT/nextjs-frontend" && npm run dev &
NEXT_PID=$!

# Kill both on Ctrl+C
trap "kill $SPRING_PID $NEXT_PID 2>/dev/null; exit" INT TERM

echo ""
echo "Both servers running."
echo "  API  -> http://localhost:8080"
echo "  App  -> http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both."

wait
