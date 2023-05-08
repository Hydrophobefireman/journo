def setup_env() -> None:
    import dotenv
    from os.path import join
    from os import getcwd

    dotenv.load_dotenv(join(getcwd(), ".env"))
