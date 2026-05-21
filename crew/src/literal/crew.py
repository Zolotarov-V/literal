# from crewai import Agent, Crew, Process, Task
# from crewai.project import CrewBase, agent, crew, task
# from crewai.agents.agent_builder.base_agent import BaseAgent
# # If you want to run a snippet of code before or after the crew starts,
# # you can use the @before_kickoff and @after_kickoff decorators
# # https://docs.crewai.com/concepts/crews#example-crew-class-with-decorators
#
# @CrewBase
# class Literal():
#     """Literal crew"""
#
#     agents: list[BaseAgent]
#     tasks: list[Task]
#
#     # Learn more about YAML configuration files here:
#     # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
#     # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended
#
#     # If you would like to add tools to your agents, you can learn more about it here:
#     # https://docs.crewai.com/concepts/agents#agent-tools
#     @agent
#     def researcher(self) -> Agent:
#         return Agent(
#             config=self.agents_config['researcher'], # type: ignore[index]
#             verbose=True
#         )
#
#     @agent
#     def reporting_analyst(self) -> Agent:
#         return Agent(
#             config=self.agents_config['reporting_analyst'], # type: ignore[index]
#             verbose=True
#         )
#
#     # To learn more about structured task outputs,
#     # task dependencies, and task callbacks, check out the documentation:
#     # https://docs.crewai.com/concepts/tasks#overview-of-a-task
#     @task
#     def research_task(self) -> Task:
#         return Task(
#             config=self.tasks_config['research_task'], # type: ignore[index]
#         )
#
#     @task
#     def reporting_task(self) -> Task:
#         return Task(
#             config=self.tasks_config['reporting_task'], # type: ignore[index]
#             output_file='report.md'
#         )
#
#     @crew
#     def crew(self) -> Crew:
#         """Creates the Literal crew"""
#         # To learn how to add knowledge sources to your crew, check out the documentation:
#         # https://docs.crewai.com/concepts/knowledge#what-is-knowledge
#
#         return Crew(
#             agents=self.agents, # Automatically created by the @agent decorator
#             tasks=self.tasks, # Automatically created by the @task decorator
#             process=Process.sequential,
#             verbose=True,
#             # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
#         )

import json
from pathlib import Path

from crewai import Agent, Crew, Task, Process


class DynamicCrew:
    def __init__(self, request_path: str):
        self.request = self._load_request(request_path)

        self.agents = self._build_agents()
        self.tasks = self._build_tasks()

    def _load_request(self, path: str):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    def _build_agents(self):
        agents = {}

        for name, config in self.request["agents"].items():

            agents[name] = Agent(
                role=config["role"],
                goal=config["goal"],
                backstory=config["backstory"],
                verbose=True
            )

        return agents

    def _build_tasks(self):
        tasks = []

        for task_name, config in self.request["tasks"].items():

            agent_name = config["agent"]

            task = Task(
                description=config["description"],
                expected_output=config["expected_output"],
                agent=self.agents[agent_name]
            )

            tasks.append(task)

        return tasks

    def build(self):

        return Crew(
            agents=list(self.agents.values()),
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True
        )


# if __name__ == "__main__":
#
#     crew = DynamicCrew("request.json").build()
#
#     result = crew.kickoff(
#         inputs={
#             "topic": "AI Agents",
#             "current_year": 2026
#         }
#     )
#
#     print(result)