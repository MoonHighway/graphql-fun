import React, { Component } from 'react'
import { Musician } from './Musician'
import { Audience } from './Audience'

export const Game = ({ instrument }) => instrument ? 
    <Musician instrument={instrument} /> : 
    <Audience />   
