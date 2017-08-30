from distutils.core import setup

setup(
    name='jupyter-linenumbers',
    version='0.2.0',
    author='Wouter de Vries',
    author_email='wdevries@leukeleu.nl',
    packages=['linenumbers'],
    package_data={'linenumbers': ['static/*.js']},
    description='Continuous line numbers for Jupyter Notebooks',
    long_description=open('README.txt').read(),
)